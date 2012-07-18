require 'sinatra'
require 'haml'
require 'sass'

configure do
  set :haml, { :format => :html5 }
  set :scss, { :style  => :compact }
end

get '/' do
  erb :application
end

get '/application.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :application
end
