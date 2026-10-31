import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/devices';

function App() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    deviceId: '', name: '', deviceType: '', room: '', brand: '', model: '', quantity: 1, status: 'Đang sử dụng', purchaseDate: '', description: ''
  });

  useEffect(() => {
    fetchDevices();
  }, [search]);

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const fetchDevices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}?search=${search}`);
      setDevices(res.data);
    } catch (err) {
      setError('Lỗi khi tải danh sách thiết bị. Vui lòng kiểm tra kết nối Backend!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        showNotify('✅ Cập nhật thông tin thiết bị thành công!');
      } else {
        await axios.post(API_URL, formData);
        showNotify('✅ Thêm thiết bị mới thành công!');
      }
      resetForm();
      fetchDevices();
    } catch (err) {
      setError(err.response?.data?.error || '⚠️ Thao tác thất bại! Vui lòng kiểm tra dữ liệu.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        showNotify('🗑️ Xóa thiết bị thành công!');
        if (selectedDevice && selectedDevice._id === id) {
          setSelectedDevice(null);
        }
        fetchDevices();
      } catch (err) {
        setError('❌ Không thể xóa thiết bị!');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      deviceId: '', name: '', deviceType: '', room: '', brand: '', model: '', quantity: 1, status: 'Đang sử dụng', purchaseDate: '', description: ''
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Đang sử dụng': return 'status-active';
      case 'Hư hỏng': return 'status-damaged';
      case 'Đang sửa chữa': return 'status-repairing';
      case 'Ngừng sử dụng': return 'status-disabled';
      default: return '';
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Hệ Thống Quản Lý Thiết Bị Phòng Học</h1>
        <p className="student-info"><strong>Sinh viên:</strong> Trần Quốc Đạt | <strong>MSSV:</strong> 235598</p>
      </header>

      {notification && <div className="alert alert-success">{notification}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="search-section">
        <input 
          type="text" 
          placeholder="🔍 Tìm kiếm theo mã, tên, loại thiết bị hoặc phòng học..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <form onSubmit={handleSubmit} className="device-form">
        <h3>{editingId ? '✏️ Cập Nhật Thông Tin Thiết Bị' : '➕ Thêm Thiết Bị Mới'}</h3>
        <div className="form-grid">
          <input type="text" placeholder="Mã thiết bị (*)" value={formData.deviceId} onChange={(e) => setFormData({...formData, deviceId: e.target.value})} required disabled={!!editingId} />
          <input type="text" placeholder="Tên thiết bị (*)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="text" placeholder="Loại thiết bị (*)" value={formData.deviceType} onChange={(e) => setFormData({...formData, deviceType: e.target.value})} required />
          <input type="text" placeholder="Phòng học (*)" value={formData.room} onChange={(e) => setFormData({...formData, room: e.target.value})} required />
          <input type="text" placeholder="Hãng sản xuất" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
          <input type="text" placeholder="Model" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} />
          <input type="number" placeholder="Số lượng" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})} min="1" />
          <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="Đang sử dụng">Đang sử dụng</option>
            <option value="Hư hỏng">Hư hỏng</option>
            <option value="Đang sửa chữa">Đang sửa chữa</option>
            <option value="Ngừng sử dụng">Ngừng sử dụng</option>
          </select>
          <input type="date" value={formData.purchaseDate} onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})} />
          <input type="text" placeholder="Mô tả ghi chú" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{editingId ? 'Lưu cập nhật' : 'Thêm mới'}</button>
          {editingId && <button type="button" onClick={resetForm} className="btn btn-secondary">Hủy bỏ</button>}
        </div>
      </form>

      {selectedDevice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>👁️ Chi Tiết Thiết Bị</h3>
            <hr />
            <p><strong>Mã thiết bị:</strong> {selectedDevice.deviceId}</p>
            <p><strong>Tên thiết bị:</strong> {selectedDevice.name}</p>
            <p><strong>Loại thiết bị:</strong> {selectedDevice.deviceType}</p>
            <p><strong>Phòng học:</strong> {selectedDevice.room}</p>
            <p><strong>Hãng / Model:</strong> {selectedDevice.brand || '---'} / {selectedDevice.model || '---'}</p>
            <p><strong>Số lượng:</strong> {selectedDevice.quantity}</p>
            <p><strong>Tình trạng:</strong> <span className={`status-badge ${getStatusClass(selectedDevice.status)}`}>{selectedDevice.status}</span></p>
            <p><strong>Ngày nhập:</strong> {selectedDevice.purchaseDate || 'Chưa cập nhật'}</p>
            <p><strong>Mô tả:</strong> {selectedDevice.description || 'Không có ghi chú'}</p>
            <button onClick={() => setSelectedDevice(null)} className="btn btn-secondary">Đóng cửa sổ</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">⏳ Đang tải danh sách thiết bị...</div>
      ) : (
        <div className="table-wrapper">
          <h3>📋 Danh Sách Thiết Bị Hiện Có</h3>
          <table>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên thiết bị</th>
                <th>Loại</th>
                <th>Phòng</th>
                <th>Số lượng</th>
                <th>Tình trạng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {devices.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Không tìm thấy thiết bị phù hợp.</td>
                </tr>
              ) : (
                devices.map((item) => (
                  <tr key={item._id}>
                    <td><strong>{item.deviceId}</strong></td>
                    <td>{item.name}</td>
                    <td>{item.deviceType}</td>
                    <td>{item.room}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button onClick={() => setSelectedDevice(item)} className="btn btn-info btn-sm">Xem</button>
                      <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm">Sửa</button>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
