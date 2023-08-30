source 'https://rubygems.org'

gem 'bundler', '1.17.3'
gem 'rails', '3.2.22.5'

#gem 'sqlite3'

group :production, :staging do
  gem "pg"
end

group :development, :test do
  gem "sqlite3"
end


gem 'haml-rails'

group :assets do
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
end

source 'https://rails-assets.org' do
  gem 'rails-assets-howler'
  gem 'rails-assets-bootstrap'
  gem 'rails-assets-jquery-ujs'
  gem 'rails-assets-modulejs'
end
