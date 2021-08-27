import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Favicon from "@/components/Favicon";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }
  render() {
    return (
      <Html lang="ko">
        <Head>
          <Favicon />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="next.js, tailwindcss, graphql, react-query 스택으로 개발한 파워제이드 블로그"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="hjzBTvhwTf9H-quCXCQ5pX3chK6RtsCnn1FMDAskYEc"
          />
          <meta
            name="naver-site-verification"
            content="3249c8a8aee385aa23d8a6b26b116d361316c00b"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
