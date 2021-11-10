import os
import sys

kilobytes = 1024
megabytes = kilobytes * 1000
chunksize = int(20 * megabytes)  # default chunksize


def split(fromfile, todir, chunksize=chunksize):
    if not os.path.exists(todir):
        os.mkdir(todir)
    else:
        for fname in os.listdir(todir):
            os.remove(os.path.join(todir, fname))
    partnum = 0
    inputfile = open(fromfile, 'rb')
    while True:
        chunk = inputfile.read(chunksize)
        if not chunk:
            break
        partnum += 1
        filename = os.path.join(todir, ('part%04d' % partnum))
        fileobj = open(filename, 'wb')
        fileobj.write(chunk)
        fileobj.close()
    return partnum


if __name__ == '__main__':
    fromfile = './9900-test-db.sqlite'
    todir = 'splite_db'

    absfrom, absto = map(os.path.abspath, [fromfile, todir])
    print('Splitting', absfrom, 'to', absto, 'by', chunksize)

    try:
        parts = split(fromfile, todir)
    except:
        print('Error during split:')
        print(sys.exc_info()[0], sys.exc_info()[1])
    else:
        print('split finished:', parts, 'parts are in', absto)
