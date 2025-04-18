# Generated by Django 5.1.3 on 2025-02-04 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkingSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_of_week', models.CharField(choices=[('Sunday', 'Sunday'), ('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'), ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday')], max_length=10)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
            ],
            options={
                'unique_together': {('day_of_week', 'start_time', 'end_time')},
            },
        ),
        migrations.DeleteModel(
            name='WorkingDay',
        ),
        migrations.DeleteModel(
            name='WorkingHour',
        ),
        migrations.AlterField(
            model_name='booking',
            name='country',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='booking',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
