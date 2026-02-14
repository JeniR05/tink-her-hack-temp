const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const app = express();
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// 1. DATABASE CONNECTION
const MONGO_URI = 'mongodb://127.0.0.1:27017/securenest';
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Database Connected"))
    .catch(err => console.log("❌ MongoDB Error: Start your mongod service!"));

// 2. MODELS
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}));

const File = mongoose.model('File', new mongoose.Schema({
    name: String, path: String, size: Number, 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    date: { type: Date, default: Date.now }
}));

// 3. MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'hack-secret-nest', resave: false, saveUninitialized: false }));

// AUTH GUARD
app.use((req, res, next) => {
    const publicPages = ['/login.html', '/register.html', '/login', '/register', '/style.css'];
    if (req.session.userId || publicPages.includes(req.path)) return next();
    res.redirect('/login.html');
});

app.use(express.static('public'));
const upload = multer({ dest: 'uploads/' });

// 4. AUTH ROUTES
app.post('/register', async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        await new User({ username: req.body.username, password: hashed }).save();
        res.redirect('/login.html');
    } catch {
        res.send(`
            <html><head><link rel="stylesheet" href="style.css"></head><body>
            <div class="form-box"><h2>Error</h2><p>User already exists.</p><br>
            <a href="/register.html" style="color:var(--blue)">Try Again</a></div>
            </body></html>
        `);
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/');
    } else { 
        res.send("Invalid Login. <a href='/login.html'>Try again</a>"); 
    }
});

app.get('/logout', (req, res) => { 
    req.session.destroy(); 
    res.redirect('/login.html'); 
});

// 5. FILE ROUTES
app.get('/api/data', async (req, res) => {
    const files = await File.find({ owner: req.session.userId });
    const size = files.reduce((acc, f) => acc + f.size, 0);
    res.json({ count: files.length, storage: (size / (1024 * 1024)).toFixed(2) + " MB", files });
});

app.post('/upload', upload.single('file'), async (req, res) => {
    if (req.file) {
        await new File({ name: req.file.originalname, path: req.file.filename, size: req.file.size, owner: req.session.userId }).save();
        res.redirect('/upload.html?success=1');
    } else { 
        res.redirect('/upload.html?error=1'); 
    }
});

app.get('/download/:id', async (req, res) => {
    const file = await File.findOne({ _id: req.params.id, owner: req.session.userId });
    if (file) res.download(path.join(UPLOAD_DIR, file.path), file.name);
});

app.post('/delete/:id', async (req, res) => {
    const file = await File.findOneAndDelete({ _id: req.params.id, owner: req.session.userId });
    if (file) fs.unlinkSync(path.join(UPLOAD_DIR, file.path));
    res.redirect('/files.html');
});

app.listen(3000, () => console.log('🚀 Server active: http://localhost:3000'));