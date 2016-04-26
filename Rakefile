require 'middleman-gh-pages'
require 'rake/clean'

CLOBBER.include('build')

task :dependencies do
  puts "installing node-static"
  sh "npm install -g node-static"
end

task :build_slate do
  puts "building slate"
  sh "bundle exec middleman build"
end

task :copy_swagger do
  puts "copying swagger UI"
  sh "cp build public -r"
  sh "cp -r api public/api"
  sh "find ."
end

task :run do 
  puts "static -a 0.0.0.0 -p "+ENV['port']
  sh "static -a 0.0.0.0 -p "+ENV['port']
end

task :build => [:dependencies, :build_slate, :copy_swagger]

task :default => [:build]