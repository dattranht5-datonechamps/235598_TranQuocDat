// ============================================================
// CÂU 3: XÂY DỰNG BACKEND API (EXPRESS & MONGOOSE)
// Sinh viên: Trần Quốc Đạt - MSSV: 235598
// ============================================================
global.crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Cho phép tất cả các tên miền (Frontend) truy cập API và tự động xử lý Preflight OPTIONS
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  deviceType: { type: String, required: true },
  room: { type: String, required: true },
  brand: { type: String, default: '' },
  model: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  status: { 
    type: String, 
    enum: ['Đang sử dụng', 'Hư hỏng', 'Đang sửa chữa', 'Ngừng sử dụng'], 
    default: 'Đang sử dụng' 
  },
  purchaseDate: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema, 'devices');

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend running successfully' });
});

app.get('/api/devices', async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { deviceId: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } },
          { deviceType: { $regex: search, $options: 'i' } },
          { room: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const list = await Device.find(filter).sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy dữ liệu', details: err.message });
  }
});

app.get('/api/devices/:id', async (req, res) => {
  try {
    const item = await Device.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Không tìm thấy thiết bị' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

app.post('/api/devices', async (req, res) => {
  try {
    const { deviceId, name, deviceType, room } = req.body;
    if (!deviceId || !name || !deviceType || !room) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ các trường bắt buộc' });
    }
    const existed = await Device.findOne({ deviceId });
    if (existed) {
      return res.status(400).json({ error: 'Mã thiết bị (deviceId) đã tồn tại!' });
    }
    const newDevice = new Device(req.body);
    const saved = await newDevice.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi thêm mới', details: err.message });
  }
});

app.put('/api/devices/:id', async (req, res) => {
  try {
    const updated = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Không tìm thấy thiết bị để cập nhật' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi cập nhật', details: err.message });
  }
});

app.delete('/api/devices/:id', async (req, res) => {
  try {
    const deleted = await Device.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Không tìm thấy thiết bị để xóa' });
    res.status(200).json({ message: 'Xóa thiết bị thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi xóa', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));