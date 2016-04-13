#FROM tutum/slate

#docker build -t devbamboracom .
#docker run -d -p 4567:4567 --name devbamboracom devbamboracom


FROM ruby:onbuild
EXPOSE 4567

RUN apt-get update && apt-get install -y nodejs \
&& apt-get clean && rm -rf /var/lib/apt/lists/*

CMD ["bundle", "exec", "middleman", "server"]