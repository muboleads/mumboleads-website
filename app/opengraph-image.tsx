import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Mumbo Leads - B2B Lead Generation & Cold Email Agency'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function OgImage() {
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
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          padding: '80px',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #a6ea70 0%, #7fc94f 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            Mumbo Leads
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: '600',
            color: 'white',
            textAlign: 'center',
            marginBottom: '30px',
            lineHeight: 1.2,
          }}
        >
          Fill Your Calendar with
        </div>
        <div
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #a6ea70 0%, #7fc94f 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Sales-Qualified Leads
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '32px',
            color: '#a0a0a0',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Expert B2B Cold Email Agency
        </div>

        {/* Border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #a6ea70 0%, #7fc94f 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
