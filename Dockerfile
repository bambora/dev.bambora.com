FROM ruby:onbuild
EXPOSE 4567

RUN apt-get update && apt-get install -y git
RUN gem install bundler
RUN bundle install


ENTRYPOINT ["rake"]
CMD ["run"]

# 1) Build: docker run devbamboracom rake build
# 2) Run:   docker run devbamboracom