import { useCallback, useEffect, useRef, useState } from 'react';

export interface OrientationState {
  beta: number; // -180..180 (front-back tilt)
  gamma: number; // -90..90 (left-right tilt)
}

interface DeviceOrientationEventConstructor {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export type PermissionStatus = 'idle' | 'unsupported' | 'requested' | 'granted' | 'denied';

export function useDeviceOrientation(): {
  orientation: OrientationState;
  status: PermissionStatus;
  request: () => Promise<void>;
} {
  const [orientation, setOrientation] = useState<OrientationState>({ beta: 0, gamma: 0 });
  const [status, setStatus] = useState<PermissionStatus>('idle');
  const attachedRef = useRef(false);

  const attach = useCallback(() => {
    if (attachedRef.current) return;
    attachedRef.current = true;
    const onOrient = (e: DeviceOrientationEvent) => {
      setOrientation({
        beta: e.beta ?? 0,
        gamma: e.gamma ?? 0,
      });
    };
    window.addEventListener('deviceorientation', onOrient, { passive: true });
  }, []);

  const request = useCallback(async () => {
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) {
      setStatus('unsupported');
      return;
    }
    const ctor = (window as unknown as { DeviceOrientationEvent: DeviceOrientationEventConstructor })
      .DeviceOrientationEvent;
    // iOS 13+ requires explicit permission.
    if (typeof ctor.requestPermission === 'function') {
      setStatus('requested');
      try {
        const result = await ctor.requestPermission();
        if (result === 'granted') {
          setStatus('granted');
          attach();
        } else {
          setStatus('denied');
        }
      } catch {
        setStatus('denied');
      }
    } else {
      // Android (Chrome) and others — no permission gate.
      setStatus('granted');
      attach();
    }
  }, [attach]);

  useEffect(() => {
    return () => {
      attachedRef.current = false;
    };
  }, []);

  return { orientation, status, request };
}
