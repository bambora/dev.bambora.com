#require 'middleman-gh-pages'
require 'rake/clean'

CLOBBER.include('build')


task :build_slate do
  puts "building slate"
  sh "bundle exec middleman build --verbose"
end

task :run_server do
  sh "bundle install"
  sh "ruby -run -ehttpd ./build -p4567"
end

task :dev_server do 
  sh "EXECJS_RUNTIME=Node bundle exec middleman"
end

task :dev => [:dev_server]

task :run => [:build_slate, :run_server]

task :static => [:build_slate]