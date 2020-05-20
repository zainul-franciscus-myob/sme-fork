# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.define 'docker', primary: true do |docker|
    docker.vm.provider 'docker' do |d|
      d.image = 'docker.myob.com/sme-web/sme-web-development:latest'
      d.pull = true
      d.create_args = [
        '-v', '/home/vagrant/app/node_modules',
        '-v', "#{ENV['HOME']}/.npmrc:/home/vagrant/.npmrc"
      ]
      d.ports = ['3000:3000']
      d.has_ssh = true
      d.remains_running = true
    end

    docker.vm.synced_folder '.', '/home/vagrant/app', docker_consistency: 'delegated'

    # Give permissions to the node_modules
    config.vm.provision 'shell', privileged: true, run: 'always', inline: <<-SHELL
      chown -R vagrant:vagrant /home/vagrant/app/node_modules
    SHELL

    # Auto load project folder
    config.vm.provision 'shell', privileged: false, run: 'always', inline: <<-SHELL
      echo "cd /home/vagrant/app" > /home/vagrant/.bash_profile
    SHELL
  end
end
