import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Cold Email Mastery Course - Turn Cold Strangers Into Paying Clients'
export const size = {
  width: 1200,
  height: 600,
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
            padding: '10px 20px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              color: '#34D399',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            $16.5M+ IN SALES PIPELINE GENERATED
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
              fontSize: '56px',
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
              fontSize: '64px',
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
              fontSize: '56px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
            }}
          >
            With One Email
          </span>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '32px',
          }}
        >
          {[
            { value: '8 Modules', label: '' },
            { value: '500+ Students', label: '' },
            { value: 'R1,999', label: '' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
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
