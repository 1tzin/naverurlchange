chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);

    // 이미 모바일 버전(m.blog.naver.com)인 경우 리디렉션하지 않음
    if (url.host === "m.blog.naver.com") {
      return { cancel: false };
    }

    // 호스트를 m.blog.naver.com으로 변경
    url.host = "m.blog.naver.com";
    const mobileUrl = url.toString();
    console.log("Redirecting to:", mobileUrl); // 디버깅용 로그
    return { redirectUrl: mobileUrl };
  },
  {
    urls: ["*://blog.naver.com/*"],
    types: ["main_frame"],
  },
  ["blocking"]
);
