require 'sinatra'
require 'haml'
require 'sass'

configure do
  set :haml, { :format => :html5 }
  set :scss, { :style  => :compact }
end

get '/application.css' do
  require './views/css/bourbon/lib/bourbon.rb'

  content_type :css
  scss :'css/application'
end

get '/' do
  haml :application
end

get '/build' do
  haml :build
end
