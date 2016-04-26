FROM ubuntu:trusty
EXPOSE 4567

RUN apt-get update
RUN apt-get install -yq ruby ruby-dev build-essential git npm
RUN gem install --no-ri --no-rdoc bundler
ADD Gemfile ./app/Gemfile
ADD Gemfile.lock ./app/Gemfile.lock
ADD Rakefile ./app/Rakefile
ADD api ./app/api
ADD source ./app/source
ADD config.rb ./app/config.rb
WORKDIR app
RUN bundle install

ENTRYPOINT ["bundle", "exec"]
CMD ["rake", "run", "port=8000"]

# 1) Build: docker run devbamboracom rake build
# 2) Run:   docker run devbamboracom
#     or:   docker run devbamboracom rake run port=8080
#     to specify the port.