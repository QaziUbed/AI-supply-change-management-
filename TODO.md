# Migration from Supabase to MySQL - TODO List

## Completed
- [ ] Analyze project structure and Supabase usage
- [ ] Create migration plan

## In Progress
- [ ] Update package.json for selected backend dependencies
- [ ] Implement backend connection module for selected database
- [ ] Update .env with MySQL credentials
- [ ] Update src/components/providers/AuthProvider.tsx for MySQL auth
- [ ] Update src/components/layout/Shell.tsx for sign out
- [ ] Update src/app/login/page.tsx for login
- [ ] Update src/app/inventory/page.tsx for inventory data
- [ ] Update src/app/dashboard/page.tsx for dashboard data
- [ ] Update src/app/api/landing-stats/route.ts
- [ ] Update src/app/api/ai/insights/route.ts
- [ ] Update src/app/api/ai/chat/route.ts
- [ ] Install new dependencies
- [ ] Test the application

## Notes
- Authentication needs custom implementation since MySQL doesn't have built-in auth like Supabase.
- Data queries need to be converted from Supabase syntax to MySQL.
- Ensure database schema is set up with tables: profiles, inventory, sales_history, demand_forecasts, ai_insights, products, suppliers.
