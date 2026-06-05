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
          background: 'linear-gradient(to bottom right, #09090b, #111115)',
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
        {/* Background glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0) 70%)',
            display: 'flex',
          }}
        />

        {/* Outer Border with slight glow */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
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
              gap: '12px',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '10px 24px',
              borderRadius: '9999px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>⚡</span>
            </div>
            <span
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#a5b4fc',
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
              margin: '0 0 20px 0',
              lineHeight: 1.1,
              letterSpacing: '-2px',
              background: 'linear-gradient(to right, #ffffff, #c7d2fe, #818cf8)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Discover Your Path.</span>
            <span>Build Your Future.</span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '22px',
              color: '#a1a1aa',
              maxWidth: '720px',
              margin: '0 0 40px 0',
              lineHeight: 1.5,
              display: 'flex',
            }}
          >
            Take our 3-minute career & mentorship survey to find your cohort, match with mentors, and start growing.
          </p>

          {/* Stats / Steps */}
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
              <span style={{ fontSize: '12px', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Step 01</span>
              <span style={{ fontSize: '18px', color: '#e4e4e7', fontWeight: 600, marginTop: '4px' }}>Complete Survey</span>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '12px', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Step 02</span>
              <span style={{ fontSize: '18px', color: '#e4e4e7', fontWeight: 600, marginTop: '4px' }}>Get Cohort Match</span>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '12px', color: '#ec4899', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Step 03</span>
              <span style={{ fontSize: '18px', color: '#e4e4e7', fontWeight: 600, marginTop: '4px' }}>Start Mentorship</span>
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
