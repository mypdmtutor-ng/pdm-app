import { mockCertificates, mockCourses } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Award, Download, ExternalLink, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Certificates() {
  const certificates = mockCertificates;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Certificates</h1>
        <p className="text-muted-foreground mt-1">
          Download and share your achievements
        </p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Certificate Preview */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-4 border border-border">
                <div className="text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Certificate of Completion</p>
                </div>
              </div>

              {/* Certificate Info */}
              <h3 className="font-semibold text-foreground mb-1">{cert.courseName}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Issued on {formatDate(cert.issuedAt)}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No certificates yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Complete courses to earn certificates that you can share with employers and on your resume.
          </p>
          <Button asChild>
            <Link to="/courses">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Link>
          </Button>
        </div>
      )}

      {/* Tip Card */}
      <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-muted-foreground">
          Certificates are issued automatically when you complete all lessons and pass all quizzes in a course.
          Each certificate includes a unique verification code.
        </p>
      </div>
    </div>
  );
}
