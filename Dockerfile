# 이미지의 기반 이미지를 선택합니다.
# 여기서는 Node.js를 기반으로 14 버전을 사용합니다.
FROM node:14

# 작업 디렉토리를 설정합니다.
WORKDIR /usr/src/app

# 호스트의 package.json과 package-lock.json을 컨테이너로 복사합니다.
COPY package*.json ./

# 필요한 패키지를 설치합니다.
RUN npm install

# 애플리케이션 소스 코드를 컨테이너로 복사합니다.
COPY . .

# 애플리케이션을 빌드합니다.
RUN npm run build

# 컨테이너를 실행할 때 사용할 명령을 지정합니다.
CMD [ "npm", "start" ]
