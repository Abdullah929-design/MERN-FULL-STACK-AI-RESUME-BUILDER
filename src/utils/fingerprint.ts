import fpPromise from '@fingerprintjs/fingerprintjs';

// Initialize the agent at application startup.
const fpPromiseInstance = fpPromise.load();

export async function getDeviceId() {
  try {
    const fp = await fpPromiseInstance;
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error('Failed to get device fingerprint:', error);
    return 'fallback-' + Math.random().toString(36).substring(2, 15);
  }
}
