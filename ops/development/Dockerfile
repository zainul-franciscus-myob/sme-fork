FROM docker.myob.com/sme-web/sme-web-buildnode@sha256:386ff0cf997d016b09d4ea3bd197fade115285891a18e893342cbd4d76d2a7dd

RUN apk add --update \
    docker openrc openssh sudo bash git \
    && rm -rf /var/cache/apk/*

# Enable sshd service
RUN rc-update add sshd && ssh-keygen -A

# Add vagrant user
RUN addgroup -S vagrant && adduser -S vagrant -G vagrant -s /bin/bash && \
    echo vagrant:vagrant | chpasswd -m && \
    install -m 755 -o vagrant -g vagrant -d /home/vagrant && \
    install -m 700 -o vagrant -g vagrant -d /home/vagrant/.ssh && \
    echo 'ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA6NF8iallvQVp22WDkTkyrtvp9eWW6A8YVr+kz4TjGYe7gHzIw+niNltGEFHzD8+v1I2YJ6oXevct1YeS0o9HZyN1Q9qgCgzUFtdOKLv6IedplqoPkcmF0aYet2PkEDo3MlTBckFXPITAMzF8dJSIFo9D8HfdOV0IAdx4O7PtixWKn5y2hMNG0zQPyUecp4pzC6kivAIhyfHilFR61RGL+GPXQ2MWZWFYbAGjyiYJnAmCP3NOTd0jMZEnDkbUvxhMmBYSdETk1rRgm+R4LOzFUGaHqHDLKLX+FIPKcF96hrucXzcWyLbIbEgE98OHlnVYCzRdK8jlqm8tehUc9c9WhQ== vagrant insecure public key' > /home/vagrant/.ssh/authorized_keys && \
    chmod 600 /home/vagrant/.ssh/authorized_keys && \
    chown vagrant:vagrant /home/vagrant/.ssh/authorized_keys

# Root Password: "vagrant" and Password-less Sudo
RUN echo root:vagrant | chpasswd -m && \
    echo 'vagrant ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/vagrant

# SSH Tweaks
RUN echo 'UseDNS no' >> /etc/ssh/sshd_config

RUN mv /app /home/vagrant/app

WORKDIR /home/vagrant/app

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
