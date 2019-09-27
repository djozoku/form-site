docker run --name form-postgres -e POSTGRES_PASSWORD=ozokudev -p 5432:5432 -d postgres
Start-Sleep -s 10
docker exec -it form-postgres runuser -l postgres -c 'createdb form-db'
Start-Sleep -s 1
pause
Start-Sleep -s 1
docker stop form-postgres
Start-Sleep -s 1
docker rm form-postgres
