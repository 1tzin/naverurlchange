# Naver Blog Mobile Redirector

네이버 블로그 PC 버전을 자동으로 **모바일 버전(m.blog.naver.com)** 으로 리디렉션하는 Chrome 확장 프로그램입니다.

---

## 기능

- 사용자가 `blog.naver.com`으로 접속하면 자동으로 `m.blog.naver.com`으로 리디렉션
- 이미 모바일 버전(`m.blog.naver.com`)인 경우에는 리디렉션하지 않음
- Chrome MV3 환경에서 동작하도록 **declarativeNetRequest** 규칙을 사용

---

## 설치 방법

1. Chrome 브라우저에서 `chrome://extensions/` 페이지로 이동
2. 우측 상단 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램 로드** 클릭
4. 확장 기능 폴더 선택 (manifest.json이 있는 폴더)

---

## 파일 구조

```

naver-blog-mobile-redirector/
│
├─ manifest.json        # 확장 프로그램 설정
├─ background.js        # 웹 요청 가로채기 스크립트 (선택적)
├─ rules.json           # declarativeNetRequest 리디렉션 규칙
└─ README.md            # 설명 문서

````

---

## manifest.json 설정

- `permissions`에는 `declarativeNetRequest` 포함
- `host_permissions`에 리디렉션 대상 도메인 포함
- `declarative_net_request.rule_resources`로 `rules.json` 참조

---

## rules.json 예시

```json
[
  {
    "id": 1,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "transform": {
          "scheme": "https",
          "host": "m.blog.naver.com"
        }
      }
    },
    "condition": {
      "urlFilter": "||blog.naver.com^",
      "resourceTypes": ["main_frame"],
      "excludedInitiatorDomains": ["m.blog.naver.com"]
    }
  }
]
````

* `urlFilter`: PC 버전 블로그 URL 필터
* `excludedInitiatorDomains`: 모바일 버전 요청 제외
* `resourceTypes`: 페이지 전체(main frame)만 대상으로 리디렉션

---

## 주의 사항

* MV3에서는 `background.js`를 통한 `webRequest` 방식보다는 **declarativeNetRequest 방식**을 권장
* 브라우저 캐시나 기존 세션으로 인해 바로 리디렉션이 적용되지 않을 수 있음
* Chrome 권한 문제로 확장 프로그램이 로드되지 않으면 `host_permissions`와 `permissions` 확인

---

## 라이선스

MIT License

