FROM ruby:2.3-onbuild
EXPOSE 4567

RUN apt-get update && apt-get install -y git
RUN gem install bundler
RUN bundle install


ENTRYPOINT ["rake"]
CMD ["run"]

# 1) Build: docker build -t devbamboracom .
# 2) Run:   docker run -d -p 4567:4567 devbamboracom