import { useState } from 'react';
import { mockCertificates, mockCourses } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Award,
  Download,
  Eye,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Extended mock certificates for admin view
const allCertificates = [
  ...mockCertificates,
  { id: 'cert-2', userId: 'user-2', courseId: 'course-1', courseName: 'Python Fundamentals', issuedAt: '2024-01-20', userName: 'Mike Chen' },
  { id: 'cert-3', userId: 'user-3', courseId: 'course-11', courseName: 'CSS & Modern Layouts', issuedAt: '2024-01-18', userName: 'Emma Wilson' },
  { id: 'cert-4', userId: 'user-4', courseId: 'course-2', courseName: 'JavaScript Essentials', issuedAt: '2024-01-15', userName: 'Nina Patel' },
  { id: 'cert-5', userId: 'user-5', courseId: 'course-8', courseName: 'Git & GitHub Workflow', issuedAt: '2024-01-12', userName: 'David Kim' },
];

export default function AdminCertificates() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCertificates = allCertificates.filter((cert) =>
    cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cert as any).userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            View all issued certificates
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Total Issued</p>
          <p className="text-2xl font-bold text-foreground">{allCertificates.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-2xl font-bold text-foreground">{allCertificates.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Unique Courses</p>
          <p className="text-2xl font-bold text-foreground">
            {new Set(allCertificates.map(c => c.courseId)).size}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search certificates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Certificates Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Certificate</th>
                <th>Student</th>
                <th>Course</th>
                <th>Issued Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map((cert) => (
                <tr key={cert.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">{cert.id}</span>
                    </div>
                  </td>
                  <td className="font-medium text-foreground">
                    {(cert as any).userName || 'Alex Johnson'}
                  </td>
                  <td>{cert.courseName}</td>
                  <td className="text-muted-foreground">
                    {new Date(cert.issuedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Certificate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
