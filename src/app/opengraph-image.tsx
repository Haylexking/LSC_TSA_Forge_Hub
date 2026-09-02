import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'LSC TSA Forge Hub';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
          padding: '40px 80px',
        }}
      >
        {/* Subtle non-neon ambient orb */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '30%',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, rgba(0, 0, 0, 0) 70%)',
            display: 'flex',
          }}
        />

        {/* Outer Border with refined Emil Kowalski style */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            pointerEvents: 'none',
            display: 'flex',
          }}
        />

        {/* Content wrapper */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '8px 20px',
              borderRadius: '9999px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: '#27272a',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#f4f4f5' }}>F</span>
            </div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#d4d4d8',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              LSC TSA • Forge Hub
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 800,
              margin: '0 0 18px 0',
              lineHeight: 1.1,
              letterSpacing: '-2px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Discover Your Path.</span>
            <span style={{ color: '#a1a1aa' }}>Build Your Future.</span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '22px',
              color: '#71717a',
              maxWidth: '720px',
              margin: '0 0 40px 0',
              lineHeight: 1.5,
              display: 'flex',
            }}
          >
            Take our 3-minute career & mentorship survey to find your cohort, match with mentors, and start growing.
          </p>

          {/* Steps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '11px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Step 01</span>
              <span style={{ fontSize: '16px', color: '#e4e4e7', fontWeight: 600, marginTop: '4px' }}>Complete Survey</span>
            </div>
            <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '11px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Step 02</span>
              <span style={{ fontSize: '16px', color: '#e4e4e7', fontWeight: 600, marginTop: '4px' }}>Get Cohort Match</span>
            </div>
            <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '11px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Step 03</span>
              <span style={{ fontSize: '16px', color: '#e4e4e7', fontWeight: 600, marginTop: '4px' }}>Start Mentorship</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
