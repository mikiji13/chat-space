# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: ture|

### Association
  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

### Association
  belongs_to :group
  belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, foreign_key: true|

### Association
  has_many :group_users
  has_many :messages
  has_many :users, through: :group_users

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
  belongs_to :group
  belongs_to :user
