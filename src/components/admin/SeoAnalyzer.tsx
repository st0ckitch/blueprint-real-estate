import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeoData {
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
}

interface SeoAnalyzerProps {
  data: SeoData;
  onChange: (data: Partial<SeoData>) => void;
}

interface AnalysisItem {
  id: string;
  label: string;
  status: 'good' | 'warning' | 'error';
  message: string;
}

const SeoAnalyzer = ({ data, onChange }: SeoAnalyzerProps) => {
  const analysis = useMemo((): AnalysisItem[] => {
    const items: AnalysisItem[] = [];
    const { focusKeyword, metaTitle, metaDescription, content } = data;
    const keyword = focusKeyword.toLowerCase().trim();

    // Focus keyword check
    if (!keyword) {
      items.push({
        id: 'keyword',
        label: 'საკვანძო სიტყვა',
        status: 'error',
        message: 'საკვანძო სიტყვა არ არის მითითებული',
      });
    } else {
      items.push({
        id: 'keyword',
        label: 'საკვანძო სიტყვა',
        status: 'good',
        message: 'საკვანძო სიტყვა მითითებულია',
      });
    }

    // Meta title checks
    const titleLength = metaTitle.length;
    if (titleLength === 0) {
      items.push({
        id: 'title-length',
        label: 'SEO სათაური',
        status: 'error',
        message: 'SEO სათაური არ არის მითითებული',
      });
    } else if (titleLength < 30) {
      items.push({
        id: 'title-length',
        label: 'SEO სათაური',
        status: 'warning',
        message: `სათაური ძალიან მოკლეა (${titleLength}/60 სიმბოლო)`,
      });
    } else if (titleLength > 60) {
      items.push({
        id: 'title-length',
        label: 'SEO სათაური',
        status: 'warning',
        message: `სათაური ძალიან გრძელია (${titleLength}/60 სიმბოლო)`,
      });
    } else {
      items.push({
        id: 'title-length',
        label: 'SEO სათაური',
        status: 'good',
        message: `სათაურის სიგრძე ოპტიმალურია (${titleLength}/60 სიმბოლო)`,
      });
    }

    // Keyword in title
    if (keyword && metaTitle.toLowerCase().includes(keyword)) {
      items.push({
        id: 'keyword-title',
        label: 'საკვანძო სიტყვა სათაურში',
        status: 'good',
        message: 'საკვანძო სიტყვა მოცემულია სათაურში',
      });
    } else if (keyword) {
      items.push({
        id: 'keyword-title',
        label: 'საკვანძო სიტყვა სათაურში',
        status: 'error',
        message: 'საკვანძო სიტყვა არ არის სათაურში',
      });
    }

    // Meta description checks
    const descLength = metaDescription.length;
    if (descLength === 0) {
      items.push({
        id: 'desc-length',
        label: 'Meta აღწერა',
        status: 'error',
        message: 'Meta აღწერა არ არის მითითებული',
      });
    } else if (descLength < 120) {
      items.push({
        id: 'desc-length',
        label: 'Meta აღწერა',
        status: 'warning',
        message: `აღწერა ძალიან მოკლეა (${descLength}/160 სიმბოლო)`,
      });
    } else if (descLength > 160) {
      items.push({
        id: 'desc-length',
        label: 'Meta აღწერა',
        status: 'warning',
        message: `აღწერა ძალიან გრძელია (${descLength}/160 სიმბოლო)`,
      });
    } else {
      items.push({
        id: 'desc-length',
        label: 'Meta აღწერა',
        status: 'good',
        message: `აღწერის სიგრძე ოპტიმალურია (${descLength}/160 სიმბოლო)`,
      });
    }

    // Keyword in description
    if (keyword && metaDescription.toLowerCase().includes(keyword)) {
      items.push({
        id: 'keyword-desc',
        label: 'საკვანძო სიტყვა აღწერაში',
        status: 'good',
        message: 'საკვანძო სიტყვა მოცემულია აღწერაში',
      });
    } else if (keyword) {
      items.push({
        id: 'keyword-desc',
        label: 'საკვანძო სიტყვა აღწერაში',
        status: 'warning',
        message: 'საკვანძო სიტყვა არ არის აღწერაში',
      });
    }

    // Content length
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
    if (wordCount < 100) {
      items.push({
        id: 'content-length',
        label: 'კონტენტის სიგრძე',
        status: 'error',
        message: `კონტენტი ძალიან მოკლეა (${wordCount} სიტყვა, მინიმუმ 300)`,
      });
    } else if (wordCount < 300) {
      items.push({
        id: 'content-length',
        label: 'კონტენტის სიგრძე',
        status: 'warning',
        message: `კონტენტი მოკლეა (${wordCount} სიტყვა, რეკომენდებულია 300+)`,
      });
    } else {
      items.push({
        id: 'content-length',
        label: 'კონტენტის სიგრძე',
        status: 'good',
        message: `კონტენტის სიგრძე კარგია (${wordCount} სიტყვა)`,
      });
    }

    // Keyword in content
    if (keyword && content.toLowerCase().includes(keyword)) {
      items.push({
        id: 'keyword-content',
        label: 'საკვანძო სიტყვა კონტენტში',
        status: 'good',
        message: 'საკვანძო სიტყვა მოცემულია კონტენტში',
      });
    } else if (keyword) {
      items.push({
        id: 'keyword-content',
        label: 'საკვანძო სიტყვა კონტენტში',
        status: 'error',
        message: 'საკვანძო სიტყვა არ არის კონტენტში',
      });
    }

    return items;
  }, [data]);

  const seoScore = useMemo(() => {
    const total = analysis.length;
    const good = analysis.filter((a) => a.status === 'good').length;
    return Math.round((good / total) * 100);
  }, [analysis]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const StatusIcon = ({ status }: { status: AnalysisItem['status'] }) => {
    switch (status) {
      case 'good':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>SEO ანალიზი</span>
          <span className={cn('text-2xl font-bold', getScoreColor(seoScore))}>
            {seoScore}%
          </span>
        </CardTitle>
        <Progress value={seoScore} className={cn('h-2', getProgressColor(seoScore))} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* SEO Inputs */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="focusKeyword">საკვანძო სიტყვა</Label>
            <Input
              id="focusKeyword"
              value={data.focusKeyword}
              onChange={(e) => onChange({ focusKeyword: e.target.value })}
              placeholder="მაგ: თბილისი ბინები"
            />
          </div>
          <div>
            <Label htmlFor="metaTitle">
              SEO სათაური{' '}
              <span className="text-muted-foreground">({data.metaTitle.length}/60)</span>
            </Label>
            <Input
              id="metaTitle"
              value={data.metaTitle}
              onChange={(e) => onChange({ metaTitle: e.target.value })}
              placeholder="სათაური ძიებისთვის"
              maxLength={70}
            />
          </div>
          <div>
            <Label htmlFor="metaDescription">
              Meta აღწერა{' '}
              <span className="text-muted-foreground">({data.metaDescription.length}/160)</span>
            </Label>
            <Textarea
              id="metaDescription"
              value={data.metaDescription}
              onChange={(e) => onChange({ metaDescription: e.target.value })}
              placeholder="მოკლე აღწერა ძიების შედეგებისთვის"
              maxLength={170}
              rows={3}
            />
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-medium text-muted-foreground">ანალიზის შედეგები</h4>
          <div className="space-y-2">
            {analysis.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2 rounded-lg border p-2 text-sm"
              >
                <StatusIcon status={item.status} />
                <div>
                  <span className="font-medium">{item.label}: </span>
                  <span className="text-muted-foreground">{item.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoAnalyzer;
