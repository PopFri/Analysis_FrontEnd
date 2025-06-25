export const table = {
    "name": "Log",
    "detail": "JSON 형태로 데이터 요청",
    "columns": [
        {
            "name": "HTTP_POPFRI_IP",
            "detail": "클라이언트 IP 주소"
        },
        {
            "name": "HTTP_HOST",
            "detail": "요청이 도달한 서버의 호스트명 또는 컨테이너 이름"
        },
        {
            "name": "HTTP_CONNECTION",
            "detail": "HTTP 연결 설정 (예: 'close'는 응답 후 연결 종료)"
        },
        {
            "name": "HTTP_CONTENT_LENGTH",
            "detail": "요청 본문의 크기 (바이트 단위)"
        },
        {
            "name": "HTTP_USER_AGENT",
            "detail": "사용자 브라우저 및 OS 정보"
        },
        {
            "name": "HTTP_DNT",
            "detail": "Do Not Track 설정 값 (1이면 추적 비허용 의사 표시)"
        },
        {
            "name": "HTTP_CONTENT_TYPE",
            "detail": "요청의 콘텐츠 유형 (예: application/x-www-form-urlencoded)"
        },
        {
            "name": "HTTP_ACCEPT",
            "detail": "클라이언트가 허용하는 응답 MIME 타입"
        },
        {
            "name": "HTTP_ORIGIN",
            "detail": "요청을 유발한 출처 (CORS 정책에 사용됨)"
        },
        {
            "name": "HTTP_REFERER",
            "detail": "요청 직전의 페이지 URL"
        },
        {
            "name": "HTTP_ACCEPT_ENCODING",
            "detail": "지원되는 압축 방식 (예: gzip, deflate)"
        },
        {
            "name": "HTTP_ACCEPT_LANGUAGE",
            "detail": "사용자의 선호 언어 목록"
        },
        {
            "name": "REMOTE_ADDR",
            "detail": "요청을 보낸 클라이언트의 IP"
        },
        {
            "name": "QUERY_ping",
            "detail": "페이지뷰와는 별개로 세션 유지 또는 활성 확인용 핑 요청 여부 (1이면 핑)"
        },
        {
            "name": "QUERY_idsite",
            "detail": "Matomo에서 정의한 사이트 ID"
        },
        {
            "name": "QUERY_rec",
            "detail": "기록 여부 플래그"
        },
        {
            "name": "QUERY_r",
            "detail": "캐시 방지를 위한 무작위 수 (random)"
        },
        {
            "name": "QUERY_h",
            "detail": "요청 시점의 시간(hour)"
        },
        {
            "name": "QUERY_m",
            "detail": "요청 시점의 분(minute)"
        },
        {
            "name": "QUERY_s",
            "detail": "요청 시점의 초(second)"
        },
        {
            "name": "QUERY_url",
            "detail": "사용자가 방문한 실제 URL"
        },
        {
            "name": "QUERY_uid",
            "detail": "사용자 고유 ID"
        },
        {
            "name": "QUERY__id",
            "detail": "Matomo 방문자 고유 ID (쿠키 기반)"
        },
        {
            "name": "QUERY__idn",
            "detail": "신규 방문 여부 (1 = 신규 방문, 0 = 기존)"
        },
        {
            "name": "QUERY_send_image",
            "detail": "이미지 트래커 전송 여부 (0 = 이미지 생략)"
        },
        {
            "name": "QUERY__refts",
            "detail": "참조 사이트 방문 시간 (timestamp; 없을 경우 0)"
        },
        {
            "name": "QUERY_pf_net",
            "detail": "페이지 로딩 네트워크 지연 시간(ms)"
        },
        {
            "name": "QUERY_pf_srv",
            "detail": "페이지 로딩 서버 처리 시간(ms)"
        },
        {
            "name": "QUERY_pf_tfr",
            "detail": "페이지 로딩 전송 시간(ms)"
        },
        {
            "name": "QUERY_pf_dm1",
            "detail": "페이지 로딩 DOM 처리 1단계 시간(ms)"
        },
        {
            "name": "QUERY_pf_dm2",
            "detail": "페이지 로딩 DOM 처리 2단계 시간(ms)"
        },
        {
            "name": "QUERY_pf_onl",
            "detail": "페이지가 완전히 로딩된 후 경과 시간(ms)"
        },
        {
            "name": "QUERY_pv_id",
            "detail": "Matomo가 생성한 페이지뷰 고유 식별자"
        },
        {
            "name": "QUERY_uadata",
            "detail": "User-Agent Client Hints 데이터"
        },
        {
            "name": "QUERY_pdf",
            "detail": "브라우저의 PDF 지원 여부 (1 = 지원)"
        },
        {
            "name": "QUERY_qt",
            "detail": "QuickTime 지원 여부 (0 = 미지원)"
        },
        {
            "name": "QUERY_realp",
            "detail": "RealPlayer 지원 여부 (0 = 미지원)"
        },
        {
            "name": "QUERY_wma",
            "detail": "Windows Media 지원 여부 (0 = 미지원)"
        },
        {
            "name": "QUERY_fla",
            "detail": "Flash 지원 여부 (0 = 미지원)"
        },
        {
            "name": "QUERY_java",
            "detail": "Java 실행 환경 지원 여부 (0 = 미지원)"
        },
        {
            "name": "QUERY_ag",
            "detail": "Silverlight 지원 여부 (0 = 미지원)"
        },
        {
            "name": "QUERY_cookie",
            "detail": "쿠키 사용 가능 여부 (1 = 쿠키 사용 가능)"
        },
        {
            "name": "QUERY_res",
            "detail": "화면 해상도 (예: 1920x1080)"
        },
        {
            "name": "QUERY_dimension1",
            "detail": "방문한 영화 제목"
        },
        {
            "name": "QUERY_dimension2",
            "detail": "사용자 생일"
        },
        {
            "name": "QUERY_dimension3",
            "detail": "사용자 성별"
        }
    ]
};
