import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Snipcart stylesheet */}
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        
        {/* Snipcart div */}
        <div hidden id="snipcart" data-api-key="M2M2MDUzY2ItZjY0ZC00Y2M0LWFhNjgtMjA2MGExZDM2ODFkNjM4ODA0Mzg1MTU5Njc3OTU3" />
        
        {/* Fix for Next.js: Use dangerouslySetInnerHTML for script */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                var script = document.createElement('script');
                script.src = "https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js";
                document.body.appendChild(script);
              });
            `
          }}
        />
      </body>
    </Html>
  );
}
