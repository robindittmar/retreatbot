create schema if not exists retreatbot;

start transaction;

create user reatreatbot_user
    with password '6sBfdAq$HkgNA$MwkmwaXQ6FH&c3rpd2';

grant delete, insert, select, update on all tables in schema retreatbot to reatreatbot_user;

commit;
