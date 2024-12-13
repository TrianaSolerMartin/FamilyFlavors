import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.TK_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

export { register, login };
