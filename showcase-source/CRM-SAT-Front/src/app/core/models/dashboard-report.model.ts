export interface DashboardReport {
 id: number;
  dashboardId: number | null;
  name: string;
  description?: string | null;
  type: 'metabase' | 'vicidial' | 'custom';
  status: boolean;
}
