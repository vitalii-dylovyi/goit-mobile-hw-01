const renderStats: Record<string, { count: number; lastRender: number }> = {};
let optimizationPhase: 'before' | 'after' | null = null;

export function setOptimizationPhase(phase: 'before' | 'after') {
  optimizationPhase = phase;
}

export function trackRender(componentName: string) {
  if (!__DEV__) return;

  if (!renderStats[componentName]) {
    renderStats[componentName] = { count: 0, lastRender: Date.now() };
  }

  renderStats[componentName].count += 1;
  renderStats[componentName].lastRender = Date.now();

  console.log(
    `[RenderTracker] ${componentName}: ${renderStats[componentName].count} renders`
  );
}

export function getRenderStats() {
  return { ...renderStats };
}

export function logRenderStats() {
  if (!__DEV__) return;

  console.log('\n=== Render Statistics ===');
  Object.entries(renderStats).forEach(([name, stats]) => {
    console.log(`${name}: ${stats.count} renders`);
  });
  console.log('========================\n');
}

export function resetRenderStats() {
  if (!__DEV__) return;

  Object.keys(renderStats).forEach((key) => {
    delete renderStats[key];
  });
  console.log('[RenderTracker] Statistics reset');
}

export function logRenderStatsSummary() {
  if (!__DEV__) return;

  const stats = getRenderStats();
  const phase = optimizationPhase || 'unknown';
  const timestamp = new Date().toISOString();
  
  const totalRenders = Object.values(stats).reduce((sum, s) => sum + s.count, 0);
  
  console.log(`\n[RenderTracker] ===== ${phase.toUpperCase()} OPTIMIZATION STATS =====`);
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Total Renders: ${totalRenders}\n`);
  
  console.log('Component Breakdown:');
  Object.entries(stats)
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([name, stat]) => {
      console.log(`  ${name}: ${stat.count} renders`);
    });
  
  console.log(`\n[RenderTracker] ===========================================\n`);
}

