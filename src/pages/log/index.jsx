
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const LogSheet = () => {
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchLogs();
    }, [dateRange]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/logs/?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`);
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewLog = (log) => {
        setSelectedLog(log);
    };

    const handleDownloadPDF = async (logId) => {
        try {
            const response = await api.get(`/api/logs/${logId}/pdf/`, {
                responseType: 'blob'
            });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `log-${logId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const handleRangeChange = (e) => {
        setDateRange({
            ...dateRange,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="log-sheet">
            <h1>Driver Log Sheets</h1>

            <div className="date-range-filter">
                <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={dateRange.startDate}
                        onChange={handleRangeChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={dateRange.endDate}
                        onChange={handleRangeChange}
                    />
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading logs...</div>
            ) : (
                <div className="logs-container">
                    {logs.length > 0 ? (
                        <div className="logs-grid">
                            <div className="logs-list">
                                <h2>Available Logs</h2>
                                <table className="logs-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Trip</th>
                                            <th>Hours</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map(log => (
                                            <tr key={log.id} className={selectedLog?.id === log.id ? 'selected' : ''}>
                                                <td>{new Date(log.date).toLocaleDateString()}</td>
                                                <td>{log.trip_description || 'No Trip'}</td>
                                                <td>{log.hours_logged} hrs</td>
                                                <td>
                                                    <span className={`status-badge status-${log.status.toLowerCase()}`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-sm"
                                                        onClick={() => handleViewLog(log)}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="btn-sm"
                                                        onClick={() => handleDownloadPDF(log.id)}
                                                    >
                                                        PDF
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="log-details">
                                {selectedLog ? (
                                    <>
                                        <h2>Log Details - {new Date(selectedLog.date).toLocaleDateString()}</h2>
                                        <div className="log-summary">
                                            <div className="summary-item">
                                                <h3>Trip</h3>
                                                <p>{selectedLog.trip_description || 'No Trip'}</p>
                                            </div>
                                            <div className="summary-item">
                                                <h3>Hours Logged</h3>
                                                <p>{selectedLog.hours_logged} hrs</p>
                                            </div>
                                            <div className="summary-item">
                                                <h3>Cycle Hours</h3>
                                                <p>{selectedLog.cycle_hours} / 70 hrs</p>
                                            </div>
                                            <div className="summary-item">
                                                <h3>Status</h3>
                                                <p>{selectedLog.status}</p>
                                            </div>
                                        </div>

                                        <h3>Daily Activity</h3>
                                        <div className="log-timeline">
                                            {selectedLog.activities.map((activity, index) => (
                                                <div key={index} className="timeline-item">
                                                    <div className="timeline-time">
                                                        {activity.start_time} - {activity.end_time}
                                                    </div>
                                                    <div className="timeline-content">
                                                        <h4>{activity.type}</h4>
                                                        <p>{activity.description}</p>
                                                        {activity.location && (
                                                            <p><strong>Location:</strong> {activity.location}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="action-buttons">
                                            <button
                                                className="btn-primary"
                                                onClick={() => handleDownloadPDF(selectedLog.id)}
                                            >
                                                Download PDF
                                            </button>
                                            {selectedLog.status === 'DRAFT' && (
                                                <button className="btn-secondary">Edit Log</button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-log-selected">
                                        <p>Select a log to view details</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="no-logs">
                            <p>No logs found for the selected date range</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LogSheet;