source 'https://rubygems.org'

gem 'bundler', '1.10.5'
gem 'rails', '3.2.21'

#gem 'sqlite3'

group :production, :staging do
  gem "pg"
end

group :development, :test do
  gem "sqlite3"
end

group :assets do
  gem 'haml-rails'
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
end

# gem 'nokogiri'

source 'https://rails-assets.org' do
  gem 'rails-assets-howler'
  gem 'rails-assets-bootstrap'
  gem 'rails-assets-jquery-ujs'
end
