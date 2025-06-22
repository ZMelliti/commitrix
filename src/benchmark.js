const { lintCommit } = require('./linter');

function runBenchmark() {
  console.log('⚡ Running Commitrix Performance Benchmark...\n');
  
  const testMessages = [
    'feat: add user authentication',
    'fix: resolve memory leak in parser',
    'docs: update API documentation',
    'invalid commit message',
    'feat: implement advanced search functionality with filters',
    'fix bug',
    'chore: update dependencies to latest versions'
  ];
  
  const iterations = 1000;
  const start = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    testMessages.forEach(message => {
      lintCommit(message);
    });
  }
  
  const end = process.hrtime.bigint();
  const totalTime = Number(end - start) / 1000000; // Convert to milliseconds
  const avgTime = totalTime / (iterations * testMessages.length);
  
  console.log('📊 Benchmark Results:');
  console.log(`⏱️  Total time: ${totalTime.toFixed(2)}ms`);
  console.log(`🚀 Average per lint: ${avgTime.toFixed(3)}ms`);
  console.log(`📈 Throughput: ${Math.round(1000 / avgTime)} lints/second`);
  console.log(`💾 Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
}

module.exports = { runBenchmark };