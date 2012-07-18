require 'sinatra'
require 'haml'
require 'sass'

configure do
  set :haml, { :format => :html5 }
  set :scss, { :style  => :compact }
end

get '/application.css' do
  require './views/stylesheets/bourbon/lib/bourbon.rb'
  content_type :css
  scss :application
end

get '/' do
  haml :application
end

get '/build' do
  haml :build
end
