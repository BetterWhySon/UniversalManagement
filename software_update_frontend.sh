#!/bin/bash

# 소스코드 경로 진입
project_dir="/srv/betterwhy/web/ess_webapp_frontend"
cd "$project_dir"

# 버전 체크 (버전이 없을 시 자동 업데이트)
version_file="sw_version.txt"
if [ ! -f "$version_file" ]; then
  echo "version이 존재하지 않습니다. 기본 버전으로 설정합니다."
  current_version="0.0.0"
else
  current_version=$(cat "$version_file")
fi

echo "Git 저장소 업데이트 중..."
git pull


new_version=$(cat "$version_file")


if [ "$new_version" = "$current_version" ]; then
  echo "소프트웨어는 이미 최신 버전입니다."
else
  echo "서비스를 다시 시작 중..."
  npm run build
  echo "소프트웨어가 성공적으로 업그레이드되었습니다."
fi
