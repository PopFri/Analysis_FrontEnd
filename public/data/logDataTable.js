export const table1 = {
    "name": "log_visit",
    "detail": "방문 단위의 정보 저장",
    "columns": [
        {
            "name": "idvisit",
            "detail": "방문 고유 ID"
        },
        {
            "name": "idsite",
            "detail": "사이트 ID (Matomo 인스턴스 기준)"
        },
        {
            "name": "idvisitor",
            "detail": "방문자 고유 ID (브라우저 쿠키 또는 uid로 식별)"
        },
        {
            "name": "visitor_localtime",
            "detail": "방문자의 로컬 시간"
        },
        {
            "name": "visit_first_action_time",
            "detail": "첫 액션 시간"
        },
        {
            "name": "visit_last_action_time",
            "detail": "마지막 액션 시간"
        },
        {
            "name": "visit_total_actions",
            "detail": "총 액션 수 (클릭, 페이지 뷰 등)"
        },
        {
            "name": "visit_total_time",
            "detail": "총 체류 시간"
        },
        {
            "name": "location_ip",
            "detail": "방문자의 IP 주소"
        },
        {
            "name": "user_id",
            "detail": "사용자 ID (uid로 전송한 값)"
        },
        {
            "name": "referer_name",
            "detail": "유입 경로 도메인 (ex. google)"
        },
        {
            "name": "referer_keyword",
            "detail": "검색 키워드"
        },
        {
            "name": "device_type",
            "detail": "기기 종류 (ex. desktop, smartphone 등)"
        },
        {
            "name": "operating_system",
            "detail": "OS 이름"
        },
        {
            "name": "browser_name",
            "detail": "브라우저 이름"
        },
    ]
};

export const table2 = {
    "name": "log_link_visit_action",
    "detail": "개별 액션(페이지 뷰 등) 기록",
    "columns": [
        {
            "name": "idlink_va",
            "detail": "액션 고유 ID"
        },
        {
            "name": "idvisit",
            "detail": "연결된 방문 ID"
        },
        {
            "name": "server_time",
            "detail": "서버 수신 시간"
        },
        {
            "name": "idaction_url",
            "detail": "URL 액션 ID"
        },
        {
            "name": "idaction_name",
            "detail": "페이지 타이틀 또는 이벤트 이름"
        },
        {
            "name": "time_spent_ref_action",
            "detail": "이전 액션에 머문 시간"
        },
        {
            "name": "custom_float",
            "detail": "이벤트 값 또는 커스텀 값"
        },
        {
            "name": "pageview_position",
            "detail": "몇 번째 페이지뷰인지"
        },
        {
            "name": "interaction_position",
            "detail": "상호작용 순서 (ex. 클릭 등)"
        },
    ]
};

export const table3 = {
    "name": "log_action",
    "detail": "URL, 페이지 타이틀, 이벤트 이름 저장",
    "columns": [
        {
            "name": "idaction",
            "detail": "액션 고유 ID"
        },
        {
            "name": "name",
            "detail": "실제 URL, 이벤트 이름 등"
        },
        {
            "name": "type",
            "detail": "액션 타입 (페이지뷰, 이벤트 등)"
        },
    ]
};