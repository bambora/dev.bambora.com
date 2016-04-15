FROM ruby:onbuild
EXPOSE 4567

RUN apt-get update && apt-get install -y \
nodejs \
npm \
&& apt-get clean && rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm install -g static-server
RUN bundle exec middleman build --clean
RUN mv build public
RUN mv api ./public/
WORKDIR public
CMD ["static-server", "-p", "8000"]