
import React, { useMemo, useState } from 'react';
import './Reports.css';

const sampleReports = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    category: 'Blood Test',
    doctor: 'Dr. Ravi Kumar',
    date: '2026-11-02',
    status: 'Completed',
    fileUrl: ''
  },
  {
    id: 2,
    name: 'Blood Sugar Test',
    category: 'Blood Test',
    doctor: 'Dr. Priya Sharma',
    date: '2026-10-28',
    status: 'Completed',
    fileUrl: ''
  },
  {
    id: 3,
    name: 'Thyroid Profile',
    category: 'Blood Test',
    doctor: 'Dr. Anil Kumar',
    date: '2026-10-25',
    status: 'Pending',
    fileUrl: ''
  },
  {
    id: 4,
    name: 'Chest X-Ray',
    category: 'Radiology',
    doctor: 'Dr. Suresh',
    date: '2026-10-20',
    status: 'Completed',
    fileUrl: ''
  },
  {
    id: 5,
    name: 'ECG Report',
    category: 'Cardiology',
    doctor: 'Dr. Meera',
    date: '2026-10-15',
    status: 'Completed',
    fileUrl: ''
  },
  {
    id: 6,
    name: 'Urine Routine Test',
    category: 'Urine Test',
    doctor: 'Dr. Ravi Kumar',
    date: '2026-10-10',
    status: 'Processing',
    fileUrl: ''
  }
];

const Reports = () => {
  const [reports] = useState(sampleReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);

  const categories = [
    'All',
    'Blood Test',
    'Urine Test',
    'Radiology',
    'Cardiology'
  ];

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        report.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [reports, searchTerm, selectedCategory]);

  const completedCount = reports.filter(
    (report) => report.status === 'Completed'
  ).length;

  const pendingCount = reports.filter(
    (report) => report.status === 'Pending'
  ).length;

  const processingCount = reports.filter(
    (report) => report.status === 'Processing'
  ).length;

  const handleViewReport = (report) => {
    if (report.fileUrl) {
      window.open(report.fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedReport(report);
    }
  };

  const handleDownload = (report) => {
    if (report.fileUrl) {
      const link = document.createElement('a');
      link.href = report.fileUrl;
      link.download = `${report.name}.pdf`;
      link.click();
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>My Medical Reports</h1>
          <p>View and manage your medical test reports.</p>
        </div>
        <div className="reports-header-icon">
          <i className="fa fa-file-medical"></i>
        </div>
      </div>

      <div className="reports-stats">
        <div className="report-stat-card">
          <div className="stat-icon total-icon">
            <i className="fa fa-folder-open"></i>
          </div>
          <div>
            <h3>{reports.length}</h3>
            <p>Total Reports</p>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="stat-icon completed-icon">
            <i className="fa fa-check-circle"></i>
          </div>
          <div>
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="stat-icon pending-icon">
            <i className="fa fa-clock"></i>
          </div>
          <div>
            <h3>{pendingCount}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="stat-icon processing-icon">
            <i className="fa fa-spinner"></i>
          </div>
          <div>
            <h3>{processingCount}</h3>
            <p>Processing</p>
          </div>
        </div>
      </div>

      <div className="reports-content">
        <div className="reports-toolbar">
          <div className="reports-search">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Search reports or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="reports-filter"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="reports-list-header">
          <h2>Recent Reports</h2>
          <span>{filteredReports.length} reports found</span>
        </div>

        {filteredReports.length > 0 ? (
          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Category</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div className="report-name">
                        <i className="fa fa-file-pdf"></i>
                        <span>{report.name}</span>
                      </div>
                    </td>

                    <td>{report.category}</td>
                    <td>{report.doctor}</td>
                    <td>
                      {new Date(report.date + 'T00:00:00').toLocaleDateString(
                        'en-IN',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }
                      )}
                    </td>

                    <td>
                      <span
                        className={`report-status ${report.status.toLowerCase()}`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td>
                      <div className="report-actions">
                        <button
                          className="view-report-btn"
                          onClick={() => handleViewReport(report)}
                        >
                          <i className="fa fa-eye"></i>
                          View
                        </button>

                        <button
                          className="download-report-btn"
                          onClick={() => handleDownload(report)}
                          disabled={!report.fileUrl || report.status !== 'Completed'}
                          title={
                            report.fileUrl
                              ? 'Download report'
                              : 'PDF not uploaded yet'
                          }
                        >
                          <i className="fa fa-download"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="reports-empty">
            <i className="fa fa-file-circle-xmark"></i>
            <h3>No reports found</h3>
            <p>Try changing your search or category filter.</p>
          </div>
        )}
      </div>

      {selectedReport && (
        <div
          className="report-modal-overlay"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="report-modal-close"
              onClick={() => setSelectedReport(null)}
            >
              &times;
            </button>

            <i className="fa fa-file-pdf report-modal-icon"></i>
            <h2>{selectedReport.name}</h2>
            <p>
              This is currently a sample report entry. The actual PDF has not
              been uploaded yet.
            </p>

            <div className="report-modal-details">
              <span>Category</span>
              <strong>{selectedReport.category}</strong>

              <span>Doctor</span>
              <strong>{selectedReport.doctor}</strong>

              <span>Status</span>
              <strong>{selectedReport.status}</strong>
            </div>

            <button
              className="report-modal-button"
              onClick={() => setSelectedReport(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
