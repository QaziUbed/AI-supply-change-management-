export const mockProducts = [
  { id: 'p1', name: 'Smart Sensor Module', sku: 'SSM-100', category: 'Electronics' },
  { id: 'p2', name: 'Industrial Battery Pack', sku: 'IBP-220', category: 'Power' },
  { id: 'p3', name: 'Cooling Fan Assembly', sku: 'CFA-330', category: 'Components' },
  { id: 'p4', name: 'Edge Gateway Unit', sku: 'EGU-440', category: 'Networking' },
  { id: 'p5', name: 'Packaging Kit', sku: 'PK-550', category: 'Operations' },
];

export const mockInventory = [
  { id: 'i1', productId: 'p1', quantity_on_hand: 420, reorder_point: 220, warehouse: 'Dallas DC' },
  { id: 'i2', productId: 'p2', quantity_on_hand: 95, reorder_point: 140, warehouse: 'Chicago DC' },
  { id: 'i3', productId: 'p3', quantity_on_hand: 260, reorder_point: 180, warehouse: 'Rotterdam Hub' },
  { id: 'i4', productId: 'p4', quantity_on_hand: 70, reorder_point: 90, warehouse: 'Dallas DC' },
  { id: 'i5', productId: 'p5', quantity_on_hand: 510, reorder_point: 300, warehouse: 'Chicago DC' },
];

export const mockSuppliers = [
  { id: 's1', name: 'Vertex Components', performance_score: 0.95, lead_time_days: 7, reliability_rating: 0.96 },
  { id: 's2', name: 'Northline Manufacturing', performance_score: 0.89, lead_time_days: 12, reliability_rating: 0.9 },
  { id: 's3', name: 'BluePeak Global', performance_score: 0.92, lead_time_days: 9, reliability_rating: 0.93 },
];

export const mockSalesHistory = [
  { date: '2026-10-11', quantity_sold: 1680, revenue: 241000 },
  { date: '2026-10-12', quantity_sold: 1725, revenue: 248500 },
  { date: '2026-10-13', quantity_sold: 1775, revenue: 255400 },
  { date: '2026-10-14', quantity_sold: 1810, revenue: 260700 },
  { date: '2026-10-15', quantity_sold: 1865, revenue: 268900 },
  { date: '2026-10-16', quantity_sold: 1920, revenue: 276500 },
  { date: '2026-10-17', quantity_sold: 1970, revenue: 284200 },
];

export const mockDemandForecasts = [
  { forecast_date: '2026-10-11', predicted_quantity: 1660, confidence_level: 0.88, productId: 'p1' },
  { forecast_date: '2026-10-12', predicted_quantity: 1710, confidence_level: 0.9, productId: 'p2' },
  { forecast_date: '2026-10-13', predicted_quantity: 1760, confidence_level: 0.9, productId: 'p3' },
  { forecast_date: '2026-10-14', predicted_quantity: 1820, confidence_level: 0.89, productId: 'p4' },
  { forecast_date: '2026-10-15', predicted_quantity: 1880, confidence_level: 0.91, productId: 'p5' },
  { forecast_date: '2026-10-16', predicted_quantity: 1935, confidence_level: 0.92, productId: 'p1' },
  { forecast_date: '2026-10-17', predicted_quantity: 1985, confidence_level: 0.93, productId: 'p2' },
];

export const mockAiInsights = [
  {
    id: 'ins-1',
    category: 'Inventory',
    insight_text: 'Battery packs are below reorder targets in Chicago and should be replenished this week.',
    severity: 'High',
    created_at: '2026-10-17T09:10:00.000Z',
  },
  {
    id: 'ins-2',
    category: 'Demand',
    insight_text: 'Demand is trending up 8% week-over-week for edge gateway units.',
    severity: 'Medium',
    created_at: '2026-10-17T08:45:00.000Z',
  },
  {
    id: 'ins-3',
    category: 'Logistics',
    insight_text: 'Average lead time remains stable under 10 days across top suppliers.',
    severity: 'Low',
    created_at: '2026-10-17T07:25:00.000Z',
  },
];

export function getInventoryViewData() {
  return mockInventory.map((item) => {
    const product = mockProducts.find((p) => p.id === item.productId);
    const status = item.quantity_on_hand <= item.reorder_point / 2
      ? 'Critical'
      : item.quantity_on_hand <= item.reorder_point
        ? 'Low Stock'
        : 'Healthy';

    return {
      id: item.id,
      name: product?.name || 'Unknown',
      sku: product?.sku || 'N/A',
      category: product?.category || 'Uncategorized',
      stock: item.quantity_on_hand,
      warehouse: item.warehouse,
      min: item.reorder_point,
      status,
    };
  });
}

export function getDashboardDemandData() {
  return mockSalesHistory.map((sale) => ({
    name: new Date(sale.date).toLocaleDateString('en-US', { weekday: 'short' }),
    actual: sale.quantity_sold,
    forecast: mockDemandForecasts.find((f) => f.forecast_date === sale.date)?.predicted_quantity || sale.quantity_sold,
  }));
}

export function getDashboardInventoryData() {
  return mockInventory.slice(0, 5).map((item) => {
    const product = mockProducts.find((p) => p.id === item.productId);
    return {
      name: product?.name || 'Unknown',
      stock: item.quantity_on_hand,
      min: item.reorder_point,
      color: item.quantity_on_hand < item.reorder_point ? '#ef4444' : '#6366f1',
    };
  });
}

export function getDashboardInsights() {
  return mockAiInsights.slice(0, 3).map((ins) => ({
    id: ins.id,
    title: `${ins.category}: ${ins.insight_text.split('.')[0]}`,
    description: ins.insight_text,
    type: ins.category,
    level: ins.severity,
  }));
}

export function getLandingStats() {
  const lowStockItems = mockInventory.filter((i) => i.quantity_on_hand <= i.reorder_point).length;
  const inventoryHealth = Math.round(((mockInventory.length - lowStockItems) / mockInventory.length) * 100);

  return {
    productCount: mockProducts.length,
    supplierCount: mockSuppliers.length,
    insightCount: mockAiInsights.length + 1250,
    inventoryHealth,
    lastUpdated: new Date().toISOString(),
  };
}
