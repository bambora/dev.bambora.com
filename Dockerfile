FROM ruby:onbuild
EXPOSE 8000

RUN apt-get update && apt-get install -y \
nodejs \
npm \
&& apt-get clean && rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm install -g node-static
RUN bundle exec middleman build --clean
RUN mv build public
RUN mv api ./public/
WORKDIR public
CMD ["static", "-p", "8000", "-a", "0.0.0.0"]