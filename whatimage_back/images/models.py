from django.db import models


class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Image classified at {}".format(self.uploaded.strftime('%d-%m-%Y %H:%M'))

    def save(self, *args, **kwargs):
        try:
            print('success')
        except:
            print('classification failed')
        super(Image, self).save(*args, **kwargs)  # Call the real save() method
