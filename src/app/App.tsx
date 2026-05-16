import { HashRouter, Routes, Route, Navigate } from 'react-router';
import { EngagementProvider } from './state/engagement';
import { Home } from './screens/Home';
import { SelectFirm } from './screens/SelectFirm';
import { SelectClient } from './screens/SelectClient';
import { SelectPeriod } from './screens/SelectPeriod';
import { Documents } from './screens/Documents';
import { Processing } from './screens/Processing';
import { Review } from './screens/Review';
import { AccountantQA } from './screens/AccountantQA';
import { Vendors } from './screens/Vendors';
import { Export } from './screens/Export';
import { SystemAdvanced } from './screens/SystemAdvanced';
import { Help } from './screens/Help';
import { AccountingSetup } from './screens/AccountingSetup';
import { ChartOfAccounts } from './screens/ChartOfAccounts';
import { GIFICodes } from './screens/GIFICodes';
import { CategoryMapping } from './screens/CategoryMapping';
import { ExportMapping } from './screens/ExportMapping';
import { SavedTemplates } from './screens/SavedTemplates';

export default function App() {
  return (
    <HashRouter>
      <EngagementProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup/firm" element={<SelectFirm />} />
          <Route path="/setup/client" element={<SelectClient />} />
          <Route path="/setup/period" element={<SelectPeriod />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/review" element={<Review />} />
          <Route path="/accountant-qa" element={<AccountantQA />} />
          <Route path="/accounting-setup" element={<AccountingSetup />} />
          <Route path="/accounting-setup/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="/accounting-setup/gifi-codes" element={<GIFICodes />} />
          <Route path="/accounting-setup/category-mapping" element={<CategoryMapping />} />
          <Route path="/accounting-setup/export-mapping" element={<ExportMapping />} />
          <Route path="/accounting-setup/templates" element={<SavedTemplates />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/export" element={<Export />} />
          <Route path="/system" element={<SystemAdvanced />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </EngagementProvider>
    </HashRouter>
  );
}
