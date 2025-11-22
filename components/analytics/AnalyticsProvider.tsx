'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AnalyticsConfig {
  googleAnalytics?: {
    enabled: boolean
    measurementId?: string
  }
  googleTagManager?: {
    enabled: boolean
    containerId?: string
  }
  mixpanel?: {
    enabled: boolean
    token?: string
  }
  clarity?: {
    enabled: boolean
    projectId?: string
  }
  hotjar?: {
    enabled: boolean
    siteId?: number
    version?: number
  }
  crazyEgg?: {
    enabled: boolean
    accountNumber?: string
  }
  facebookPixel?: {
    enabled: boolean
    pixelId?: string
  }
  linkedInInsight?: {
    enabled: boolean
    partnerId?: string
  }
  customScripts?: {
    headScripts?: Array<{
      name: string
      enabled: boolean
      code: string
    }>
    bodyScripts?: Array<{
      name: string
      enabled: boolean
      code: string
    }>
  }
}

interface AnalyticsProviderProps {
  config?: AnalyticsConfig | null
  children: React.ReactNode
}

export function AnalyticsProvider({ config, children }: AnalyticsProviderProps) {
  // Google Analytics 4
  const renderGA4 = () => {
    if (!config?.googleAnalytics?.enabled || !config.googleAnalytics.measurementId) return null

    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.measurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.googleAnalytics.measurementId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </>
    )
  }

  // Google Tag Manager
  const renderGTM = () => {
    if (!config?.googleTagManager?.enabled || !config.googleTagManager.containerId) return null

    return (
      <>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.googleTagManager.containerId}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${config.googleTagManager.containerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </>
    )
  }

  // Mixpanel
  const renderMixpanel = () => {
    if (!config?.mixpanel?.enabled || !config.mixpanel.token) return null

    return (
      <Script id="mixpanel" strategy="afterInteractive">
        {`
          (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
          for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
          MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
          mixpanel.init('${config.mixpanel.token}');
        `}
      </Script>
    )
  }

  // Microsoft Clarity
  const renderClarity = () => {
    if (!config?.clarity?.enabled || !config.clarity.projectId) return null

    return (
      <Script id="clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${config.clarity.projectId}");
        `}
      </Script>
    )
  }

  // Hotjar
  const renderHotjar = () => {
    if (!config?.hotjar?.enabled || !config.hotjar.siteId) return null

    return (
      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${config.hotjar.siteId},hjsv:${config.hotjar.version || 6}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
    )
  }

  // Crazy Egg
  const renderCrazyEgg = () => {
    if (!config?.crazyEgg?.enabled || !config.crazyEgg.accountNumber) return null

    return (
      <Script
        src={`//script.crazyegg.com/pages/scripts/${config.crazyEgg.accountNumber}.js`}
        strategy="afterInteractive"
        async
      />
    )
  }

  // Facebook Pixel
  const renderFacebookPixel = () => {
    if (!config?.facebookPixel?.enabled || !config.facebookPixel.pixelId) return null

    return (
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${config.facebookPixel.pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
    )
  }

  // LinkedIn Insight
  const renderLinkedInInsight = () => {
    if (!config?.linkedInInsight?.enabled || !config.linkedInInsight.partnerId) return null

    return (
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${config.linkedInInsight.partnerId}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>
    )
  }

  // Custom Scripts
  const renderCustomScripts = () => {
    const headScripts = config?.customScripts?.headScripts?.filter(s => s.enabled) || []
    const bodyScripts = config?.customScripts?.bodyScripts?.filter(s => s.enabled) || []

    return (
      <>
        {headScripts.map((script, index) => (
          <Script
            key={`head-${index}`}
            id={`custom-head-${index}`}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: script.code }}
          />
        ))}
        {bodyScripts.map((script, index) => (
          <Script
            key={`body-${index}`}
            id={`custom-body-${index}`}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: script.code }}
          />
        ))}
      </>
    )
  }

  return (
    <>
      {renderGA4()}
      {renderGTM()}
      {renderMixpanel()}
      {renderClarity()}
      {renderHotjar()}
      {renderCrazyEgg()}
      {renderFacebookPixel()}
      {renderLinkedInInsight()}
      {renderCustomScripts()}
      {children}
    </>
  )
}
