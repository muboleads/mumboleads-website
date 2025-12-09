import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Cold Email Mastery Course - Turn Cold Strangers Into Paying Clients'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
          padding: '40px 60px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 24px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              color: '#34D399',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            FROM THE EXPERT WHO HAS GENERATED $16.5M+ IN SALES PIPELINE
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: '8px',
            }}
          >
            Turn Cold Strangers Into
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              backgroundImage: 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #8B5CF6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
              marginBottom: '8px',
            }}
          >
            Paying Clients
          </span>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
            }}
          >
            With One Email
          </span>
        </div>

        {/* Subheadline */}
        <p
          style={{
            fontSize: '24px',
            color: '#9CA3AF',
            textAlign: 'center',
            maxWidth: '800px',
            marginTop: '32px',
            lineHeight: 1.4,
          }}
        >
          The exact cold email system that has generated $16.5M+ in sales pipeline for B2B businesses worldwide.
        </p>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '40px',
          }}
        >
          {[
            { value: '8', label: 'Modules' },
            { value: '500+', label: 'Students' },
            { value: 'R1,999', label: 'Only' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  backgroundImage: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: '16px',
                  color: '#6B7280',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              color: '#6B7280',
            }}
          >
            Mumbo Education
          </span>
          <span
            style={{
              fontSize: '20px',
              color: '#374151',
            }}
          >
            •
          </span>
          <span
            style={{
              fontSize: '20px',
              color: '#10B981',
              fontWeight: 600,
            }}
          >
            mumboleads.com/course
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
