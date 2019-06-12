# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false, unique: true|

### Association
  has_many :messeges
  has_many :group_users
  has_many :groups, through: :group_users


## messegesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false|
|user_id|integer|null: false|

### Association
  belongs_to :group
  belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false, unique: true|

### Association
  has_many : group_users
  has_many :messeges
  has_many :users, through: :group_users

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
  belongs_to :group
  belongs_to :user
